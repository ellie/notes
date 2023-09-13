---
date: 2020-02-23
permalink: programming/rest-apis-and-swiftui
tags:
  - swift
title: Rest APIs and SwiftUI
---

I recently had someone ask me how I handled fetching and rendering data from a REST API in a SwiftUI view.

If you're coming from something like React, it's actually handled differently. We can't just fire off a request in `init` or `onAppear`, and update some `@State`. Awkwardness with `escaping` closures, `struct`s not being mutable, etc etc etc.

Luckily SwiftUI has some constructs that can help :) I won't be going over how to make GET requests or whatever in detail, though I like to use [Just](https://github.com/dduan/Just?ref=ellie.wtf).

Firsts up, let's have a view

```swift
struct UserProfile: View {
    @ObservedObject user: User = User(username: "elm", name: "Ellie")

    var body: some View {
    	VStack {
        	Text("Username: \(self.user.username)")
        	Text("Name: \(self.user.name)")
        }
    }
}
```

So, how do we get the `user` object here loaded? `@State`?

Actually no. There's something called an [ObservableObject](https://developer.apple.com/documentation/combine/observableobject?ref=ellie.wtf). This is an object with `@Published` properties. If a `@Published` property is updated, any view containing this object will have an update triggered.

An example will probably illustrate this more effectively

```
struct User: ObservableObject {
    @Published var username: String
    @Published var name: String

    init(username: String, name: String) {
    	self.username = username
        self.name = name
        
        self.load()
    }
    
    func load() {
    	somehowRequestDataAsynchronously();
        // so basically just change `username` or `name` in here
    }
}
```

The view essentially "observes" something "observable" - `@ObservedObject` and `@ObservableObject`. As soon as a `@Published` property is updated on something we are observing, a re-render is triggered and the view updates!

Hopefully this clears things up!