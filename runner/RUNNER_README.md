# Runner

The core flow runner logic

Gets started by a dispatcher and then handed a flow to run

Gets updated / restarted by the dispatcher if needed

### Details

The server-side runner is a Docker container which has one or more runtimes installed (node.js, python3, et.c.).

Each runtime is an executable or script that can be started as a process and which can send and receive messages using Linux named pipes, and is responsible for marshalling and demrshalling a common message format to that of the actual runtime, as well as executing a user-defined function as a reaction to message input.

Some runtimes can just take text and roll with it (node.js, common lisp, et.c.) as a user-defined function, whereas others need som massaging before they can get going (Go, Rust, et.c.)

The client-side runner will of course be running JS and will be connected to a server-side dispatcher using a full duplex protocol, WS to start with since it is easy, but later gRPC or something like that. Maybe WS over HTTP/3 will be good enough?

The client-side dispatcherrunner will run the same controller flow as the ones running on the server-side. But just the client-side Js ones, of course.

When a flow or module is updated, the flow in the runner(s) will also be updated without distrubing the flow of messages or context.


### Dependencies

How to do with dependencies? If there is just one runtime for a given language, that means that different dependencies for different modules will all need to be installed together in the runtime and can not be kept separate.

The runner must expose an API for managing runtime dependencies.

### Passing messages

Between modules in the same runtime:

```
module1 ---> runtime message data ---> module 2
```

Between modules in same runner but different runtimes:

```
module1 ---> marshall to JSON ---> unmarshall to runtime 2 message data ---> module2
```

Between modules in different runners

```
module1 ---> Marshall to JSON ---> Magically know which runner to send this to ---> unmarshall to runtime 2 message data ---> module2
```

### Runner API

listRuntimes()

[ { id, name, version  }, ... ]
listFlowsForRuntime( runtimeId )

```
[ flow, ... ]
```
addOrUpdateFlow(  flow )

```
true | false
```
removeFlow( flowId )

```
true | false
```
startFlow ( flowId )

```
true | false
```
stopFlow ( flowId )

```
true | false
```
setBreakPointAtModule( flowModuleId )

```
true | false
```
removeBreakPointAtModule( flowModuleId )

```
true | false
```
singleStepFlow()

```
{ flowModuleId: { inputStates, outputStates, errors }, ... }
```
