# yafr

Yet Another Flow Runner


... under construction ...

This is just some READMEs at the moment, to save some thoughts.



The FlowIDE web app authenticates and connects to one or more controller service. One or more separate Dispatcher services are then created, which are configured to connect to the controller service. The Dispatcher service then create one or morre runners which run individual flows.

FlowIDE --------> Dev Controller <-------- Dev Dispatcher ---------> Dev Runner

... same for staging

... same for production, et.c.

The FlowIDE will display the diferent environment controllers and let the developer quickly deploy any changes directly to them, and to debug or single-step any flow in any of their runners.

Most probably the easiest setup is to first deploy the controller as a service and then the dispatcher and runner as a separate service (perhaps in their own docker container), and configure https termination and access above that, so the services need not be bothered, except when they need to know the identity of a user.

### Flow

```
{
    name,
    version,
    id,
    profilePicture,
    backgroundPicture,
    backgroundColour,
    modules: [],
    connections: [],
    dependencies: [],
    configs: [ { name: 'foo', value: 17}, { name: 'bar', flow } ],
}
```

A dependency is declared in a module, but implemented in the flow which the module is used. When a flow is installed in a runner, the runner will ensure that all the dependencies the flow needs are installed, for all its runtimes, before starting. To be more clear, the flow dependencies are changed whenever a module is added to the flow in the FlowIDE.

In the same way, configs in the flow is a list of all the unique configs declare in the modules that make up the flow. The configs can then be connected to static values (string, number, json) or to a secret manager. It is assumed both that the programmer is authenticated to acces the secret manager when editing as will the service account of the dispacther when the flow is being deployed.

Each named config property can also be defined in a flow. By selecting that option a special flow is created which is then populated with modules and connections just like any other flow, but which will be run prior to the start of the flow to which the config is associated, and is assumed to set the named config property. This could be used for example, to read two static config values like 'db-url' and 'db-credentials' and create a config client object that can be retrieved by other modules as 'db-client'.

A module can be created

### Connection

```
{
    flowModuleIdStart,
    flowModuleIdEnd
}
```

### Dependency

```
{
    name,
    id,
    runtimeId,
    runtimeSpecificData
}
```

### Module

```
{
    name,
    version,
    id,
    profilePicture,
    backgroundPicture,
    backgroundColour,
    in: [],
    out: [],
    source,
    dependencies: [],
    tests: flow,
}
```

The runtime is any language executable (node.js, python3, et.c.) that is installed on the runner.

When a module is added to a flow in a runner, a process is started for that module by invoking the runtime with the module's configuration. All messages sent in and out will be using named pipes (Linux)

The interface declares how to store source code, hooks to call when stored and how to list, search for new and update existing  dependencies.

So a generic way to add for example the full firebase library (including gRPC compiled to native) for the node.js runtime or to add a GPU calculation library to a Go runtime. Same way to do thing regardless of internal madness in the runtime. Just implement it and look nice upwards.

### Module Testing

When a module is created or edited (rather than selected and configured) it will be shown in its test flow where special test modules can be atatched to its in/out ports. It's also a place to play around with input and debug modules, before or during writing tests.
