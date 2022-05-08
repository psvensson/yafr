# Controller

Acts as gateway between developers / IDEs and dispatcher

Authenticates developer sessions and verifies actions

If a dispatcher is installed on GCP CLoud Run or AWS Fargate, it might be cloned a number of times, but there is just one controller.

### API

Authentication is done OOB but each request need to have a proper JWT which can be verified for a configured SSO service

listDispatchers()

```
[ { name, ipAddress }, ... ]
```

createOrUpdateFlowOnDispatchers( flow )

```
true | false
```

createorUpdateModuleOnDispatchers( module )

```
true | false
```

sendCommandToDispatcher( dispatcherName, dispatcherCommand )

```
{ dispatcherReturnValue }
```
