![BlackAdi Banner](https://png.pngtree.com/thumb_back/fw800/back_our/20190622/ourmid/pngtree-chinese-style-ink-dragon-banner-image_210265.jpg)

# blog-microservice ⚙️

- This is a sample POC on microservice application to explain in a very naive way how microservice works under the hood.

  - Posts service runs on port 4000
  - Comments service runs on port 4001
  - Query service runs on port 4002
  - Moderation service runs on port 4003

- All those services emits an events into the event bus (BROKER) which is running on port 4005

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to install Skaffold after that change you hosts file to enable you local machine to think that localhost is equivalent to posts.com

```
Windows -> c:\Windows\System32\Drivers\etc\hosts
MacOS/Linux -> /etc/hosts
```

### Strartup 
```
$ skaffold dev 
```
