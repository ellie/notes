---
permalink: programming/exporting-prometheus-metrics-with-axum
draft: false
tags:
  - rust
  - til
date: 2023-09-13
title: Exporting Prometheus metrics with Axum
---
Observability is important! Generally I use Axum as my HTTP framework in [[rust|Rust]], as it's pretty ergonomic to use + fast.

> [!info]
> [tower-http](https://github.com/tower-rs/tower-http) provides a bunch of useful HTTP middlewares used in a lot of projects. At the moment it does not provide a metrics middleware. Someday it may do! 
>
> [Issue](https://github.com/tower-rs/tower-http/issues/57) to track

There are quite a few crates that do a lot of this automagically for you, but the [Axum example](https://github.com/tokio-rs/axum/blob/368c3ee08fc3896358d3bd2bfc8cc67f2925c6ef/examples/prometheus-metrics/src/main.rs) suggests using [metrics](https://github.com/metrics-rs/metrics). I honestly don't need anything extra complex and just want a `/metrics` endpoint with some counters/etc most of the time - so metrics it is!

Anyway, first we need to setup the prometheus exporter. This is basically what generates the content of `/metrics`. It uses the `metrics-exporter-prometheus` crate. You'll only want to set up a global recorder in an executable - for a library, you can leave that up to the user.

I've mostly just lifted this from the Axum example linked above 😇

```rust
fn setup_metrics_recorder() -> PrometheusHandle {
    const EXPONENTIAL_SECONDS: &[f64] = &[
        0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1.0, 2.5, 5.0, 10.0,
    ];

    PrometheusBuilder::new()
        .set_buckets_for_metric(
            Matcher::Full("http_requests_duration_seconds".to_string()),
            EXPONENTIAL_SECONDS,
        )
        .unwrap()
        .install_recorder()
        .unwrap()
}

```

I'm actually setting up two metrics today, but only `history_requests_duration_seconds` requires some setup. This is because it is a histogram, and we need to tell the exporter how to bucket the data.

Once that's done, we can write the axum middleware! (lifted from the example, and modified to compile properly. I'll open a PR)

```rust
/// Middleware to record some common HTTP metrics
/// Generic over B to allow for arbitrary body types (eg Vec<u8>, Streams, a deserialized thing, etc)
/// Someday tower-http might provide a metrics middleware: https://github.com/tower-rs/tower-http/issues/57
pub async fn track_metrics<B>(req: Request<B>, next: Next<B>)->impl IntoResponse {
    let start = Instant::now();

    let path = if let Some(matched_path) = req.extensions().get::<MatchedPath>() {
        matched_path.as_str().to_owned()
    } else {
        req.uri().path().to_owned()
    };

    let method = req.method().clone();

    // Run the rest of the request handling first, so we can measure it and get response
    // codes.
    let response = next.run(req).await;

    let latency = start.elapsed().as_secs_f64();
    let status = response.status().as_u16().to_string();

    let labels = [
        ("method", method.to_string()),
        ("path", path),
        ("status", status),
    ];

    metrics::increment_counter!("http_requests_total", &labels);
    metrics::histogram!("http_requests_duration_seconds", latency, &labels);

    response
}

```

Then, wherever you setup your Axum router, plug in the `/metrics` route! You'll need to make sure it's not publicly available.

> [!note]
>
> I learned about `std::future::ready` here! It basically creates a future that is immediately available with a value. For example:
>
> ```rust
>let f = std::future::ready(1);
> assert_eq!(a.await, 1);
> ```


```rust
let recorder_handle = setup_metrics_recorder();

let router = Router::new()
	.route("/metrics", get(move || ready(recorder_handle.render())))
	.layer(axum::middleware::from_fn(track_metrics));

```

That's pretty much it really!