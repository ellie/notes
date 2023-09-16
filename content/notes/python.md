---
permalink: notes/python
date: 2023-09-01
title: Python
tags:
  - python
---
My Python reference page

I don't spend as much time building actual large projects in Python any more (though I was paid to write Python for a few years in my early career). These days it's mostly just for random glue scripts on a variety of systems. 

### Quick s3 client
Setup an S3 client, with credentials loaded from the env. You actually don't need to explicitly list the creds, so long as you set `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`. Magic ✨

```
import boto3

s3 = boto3.resource('s3')

for bucket in s3.buckets.all():
    print(bucket.name)

```

### A generator to yield chunks of a fixed size

```python
def chunks(lst, n):
    """Yield successive n-sized chunks from lst."""
    for i in range(0, len(lst), n):
        yield lst[i:i + n]
```

From [StackOverflow](https://stackoverflow.com/questions/312443/how-do-i-split-a-list-into-equally-sized-chunks)

