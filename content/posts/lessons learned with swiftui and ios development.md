---
date: 2020-01-29
permalink: posts/lessons-learned-with-swift-ios-development
tags:
  - swift
title: Lessons learned with Swift and iOS development
---
I'd like to start this off by saying that I am _in no means an expert_. While I have been programming for a long time, I'm new to the world of Swift and iOS, and have never built a mobile app :) This is everything I've stumbled upon and learned while building the first iOS version of [Pillion](https://pillion.bike/?ref=ellie.wtf)!

> Pillion is an app to aid in finding motorcycle parking - I've got maybe 10,000 parking locations listed all over the world, some sourced from OpenStreetMaps, some from online datasets, and the rest from usersOther than parking, it also provides ride tracking

A lot of it was found while I was still figuring things out, so in a bunch of cases I wasn't doing things in the "correct" way. Where I've learned better, I've included both approaches.

I might write posts going into more detail on each section (MapBox especially) in the future, if this is well received.

Please let me know if you notice any mistakes 😊

## SwiftUI

I went straight in for using SwiftUI, the new UI system that Apple released with iOS 13. The caveat here is that only devices running iOS >= 13 are supported - though this is everything since the iPhone 6S.

Seeing as I've been using React for years, SwiftUI feels very nice. While it has differences, components/children/state in ways that feel natural. I actually prefer the state binding to how React handles state, and find that the code feels a decent bit cleaner.

I never tried UIKit so I don't really have much to compare to, but from what I have seen of SwiftUI, it is much cleaner.

I have had a few issues with SwiftUI that seem to mostly be related to its immaturity - I cover this below.

Annoyingly most of the nice UI components I could find on GitHub were only for UIKit. Maybe I'll try to wrap them at some point, but the ecosystem for SwiftUI seems a little sparse - reflecting its immaturity very well. Something to bear in mind.

## Debugging

The XCode debugger was a nice surprise! While I'm used to `ipdb` sessions with Python, I didn't expect anything as flexible considering the code was running on my phone + compiled.

I found the debugger could happily inspect values, evaluate Swift expressions, everything I wanted! Tab completion worked really nicely too. Yay for tooling :)

It can occasionally be a little slow, but I suppose that's to be expected.

## UI thread stuff

A lot of my application is essentially making a request to my API, then rendering the result. I found that attempting to update the UI from a background thread (such as the async handler for a HTTP response) would result in an error. Instead, this pattern should be used:

```swift
DispatchQueue.main.async {
    // do ui
}
```

This makes it super easy to avoid blocking the UI thread 😁

This was actually something I read very early into using Swift. I've since learned that `ObservableObjects` with some `Published` properties are more the way to go for fetching and updating stuff, where you can! I've left it here just in case it's needed though. I'm still not that happy with how HTTP requests are handled in my project so it's probably something I am going to revisit in the future.

## Keyboard hiding

Just a small thing, but I wanted to be able to hide the keyboard on certain interactions. For instance, when a search bar is focused and you touch an item in the list, hide the keyboard.

```swift
extension UIApplication {
    func hideKeyboard() {
        sendAction(#selector(UIResponder.resignFirstResponder), to: nil, from: nil, for: nil)
    }
}
```

```swift
UIApplication.shared.hideKeyboard()
```

## Just

Making HTTP requests in Swift isn't too bad, but I'm used to `requests` in Python - so I looked for something similar.

[Just](https://github.com/dduan/Just?ref=ellie.wtf) seemed to fit that bill! It's nice, small, fast, and let's you write things like this:

```swift
Just.get("https://example.com") { r in
	print(r.text)
}
```

...which is super nice!

It also lets you setup a session that has headers pre-set, which is useful for authorised HTTP requests

## Mapbox

I've been working with the [MapBox Maps SDK for iOS](https://docs.mapbox.com/ios/api/maps/5.4.0/?ref=ellie.wtf) for a large part of this project. Mapbox was a joy to work with in JavaScript, but frankly the iOS side is a little lacking. It can be awkward to customise things,  and the documentation isn't the best. I often found multiple ways to do something, with little explanation as to why. Seems like Android might be a bit better here though!

I'm not saying it's _bad_, just that it feels a tad unfinished or underdeveloped in comparison to the JS solution - and from what I've seen of the Android version, compared to that too. I'll do a comparison once I've built the Android app.

Something else here is that some of the docs are more for UIKit - makes sense as SwiftUI is so new! Just something to bear in mind. There are some docs that show you how to wrap your map for SwiftUI though

## Swift Typechecking

Coming from Rust, the Swift typechecker feels a little... lacking. Occasionally it flat out fails to infer a seemingly obvious type, or takes too long and asks the developer to break the code down a bit. Not really a huge problem, but it is a bit annoying. Apparently this is constantly improving though!

In some cases it will highlight an error in one location, when there are no issues there. Deleting the code will show the actual underlying issue. I think this is more to do with the SwiftUI DSL. When there is a type error within the DSL, if it can't infer the type then it just kinda falls apart. I can't find a good example right now, but will update this when I do.

After updating to Catalina and the latest XCode, I had a bunch of weird "ambiguous member" errors that never existed before the upgrade. Swift seems to have a tendency to give misleading error messages, which is... strange. I've never used another modern language that does the same thing, especially not one backed by such a large company.

I found I eventually got better at writing code that Swift could understand, even though what I was writing before was, as far as I know, semantically correct.

## SwiftFormat

I'm used to having formatters with other projects, so I looked for one here too. [SwiftFormat](https://github.com/nicklockwood/SwiftFormat?ref=ellie.wtf) seems to work nicely

## SwiftUI DSL issues

So with SwiftUI `View` bodies are declared with a little DSL-type-thing

```swift
var body: some View {
	ComponentOne {
    	AnotherOne {
        	// so much nesting :O
        }
    }
}
```

...which is all well and good.

However, when you want to get into conditional rendering, the DSL doesn't seem quite there yet.

```swift
if thing.ouch {
   RenderMe(thing.ouch.thing)
}
```

However, things such as `if let`, at time of writing, do not work

```
if let o = thing.ouch {
	RenderMe(o.thing)
}
```

Not essential, but would be nice!

There are a few other small issues here and there with the DSL that still need sorting, but SwiftUI is very new/beta so I'm not surprised there. Other than the issues, it is a joy to work with. When it works, it works really nicely! It's just when it doesn't ;)

## Auth0

I'm currently using Auth0 lock, with Google + Apple oauth login. I'm actually using my own solution now instead, but I've left this here as it's still relevant.

The Apple one is actually really cool! Users can choose to have an Apple forwarding address to hide their email, and login with FaceID.

Lock wasn't setup for SwiftUI, but it's pretty easy to wrap:

```swift
struct Auth0Lock: UIViewControllerRepresentable {
    typealias UIViewControllerType = LockViewController
    var lock: Lock = Lock.passwordless().withOptions {
        $0.passwordlessMethod = .magicLink
    }
    .onAuth { credentials in
        print(credentials)
        // save access token and use it to do stuff :)
    }
    .onError{ error in
        print(error)
        // you should probably do something other than just print errors
    }
    
    func makeUIViewController(context: UIViewControllerRepresentableContext<Auth0Lock>) -> LockViewController {
        return lock.controller
    }
    
    func updateUIViewController(_ uiViewController: LockViewController, context: UIViewControllerRepresentableContext<Auth0Lock>) {
        // there isn't really much updating I need to do atm
    }
}

```

Auth0 comes with a credential manager that handles refresh tokens, requesting new access tokens, saving and validating tokens, etc. So you don't really need to put a lot of work in to keep your users logged in!

> just to elaborate slightly on why I dropped Auth0I wanted more flexibility with how auth was handled, and I ended up rewriting my backend as a Django app - so it was pretty easy for me to just integrate with what Django already has.I switched to Django so I could build the product faster, and not spend time thinking about fun architecture things

## Apple developer

Signing up for an Apple Developer account for my company (Pillion Software Ltd) took maybe a week or two - filling in the online forms was fast, but it took a little while to get approved + they had to call me. All good after that though!

I tried to use Fastlane to take screenshots, but found that the simulators/tests didn't work very well (mapbox crashing in UI tests) so the only workable way was for me to just take a few manually. Not great, and I'd like to sort that. I'll get around to it eventually. It also doesn't help that my laptop is super slow + a bit old (mostly lacking in RAM), so the simulator is really crappy.

I was told after my first app store submission that my app didn't have enough functionality. Ouch. After some research, it seems like anything that _could_ be a web app, Apple aren't that keen on approving. So instead I just brought some things forward in my roadmap.

I actually had a version of my app go through the entire review process (from me pressing "submit" to it being live) in about 7 minutes, which I was very impressed with.

## Conclusions

In hindsight I think I'd probably research other solutions before diving in to using the same tech as I did for my old web version. Maybe MapKit would have done the job just fine and I wouldn't have used MapBox.

I did learn a lot in this process though, so I don't think I'd change too much. I'll be starting on building the same thing for Android soon (and I don't really know any Android dev yet either ;P) so we will see how that goes! Expect a post similar to this one.

Anyway, [Pillion is now in the App Store!](https://pillion.bike/ios?ref=ellie.wtf)

If you bike, and decide to give it a go, I'd love to know what you think - so please don't hesitate to get in touch!