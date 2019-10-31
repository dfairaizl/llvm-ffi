## FFI Interface for the LLVM 8 C API

This package provides FFI bindings/wrapper for the LLVM C API. Not all of the C API is currently supported by most of the core functionality is there. Added additional methods will be done as needed and Pull Requests are welcome!

## Usage

Install the package via NPM:

```bash
npm i --save llvm-ffi
```

You obviously have to have an installation of LLVM 8, and have installed/compiled a version of `libLLVM.dylib`.

This library loads the path to the LLVM from the environment via the variable `LLVM_PATH`.

Once LLVM is in a valid location simply require this module:

```javascript
const { libLLVM } = require('llvm-ffi');
```

And any LLVM C API call that has a binding can be called directly:

```javascript
const aModule = libLLVM.LLVMModuleCreateWithName('mymodule');
const theName = libLLVM.LLVMGetModuleIdentifier(aModule);

console.log('LLVM module name:', theName); // mymodule

// and since these are C bindings you are responsible for the memory management

libLLVM.LLVMDisposeModule(aModule);
```

## Example

Also `examples/main.js` for a runnable version.

To build a main function in LLVM thats callable when built into a binary:

```javascript
const { libLLVM, enums } = require('llvm-ffi');

const moduleRef = libLLVM.LLVMModuleCreateWithName('main_module');
const builderRef = libLLVM.LLVMCreateBuilder();

// create params for main
const params = [
  libLLVM.LLVMInt32Type(),
  libLLVM.LLVMPointerType(libLLVM.LLVMPointerType(libLLVM.LLVMInt8Type(), 0), 0)
];

// create the function prototype
const funcType = libLLVM.LLVMFunctionType(libLLVM.LLVMVoidType(), params, params.length, 0);
const func = libLLVM.LLVMAddFunction(moduleRef, 'main', funcType);

libLLVM.LLVMSetLinkage(func, enums.LLVMLinkage.LLVMExternalLinkage);

// name the params
const argc = libLLVM.LLVMGetParam(func, 0);
const argsv = libLLVM.LLVMGetParam(func, 1);

libLLVM.LLVMSetValueName(argc, 'argc');
libLLVM.LLVMSetValueName(argsv, 'argsv');

// build body of the function
const entry = libLLVM.LLVMAppendBasicBlock(func, 'entry');
libLLVM.LLVMPositionBuilderAtEnd(builderRef, entry);
libLLVM.LLVMBuildRetVoid(builderRef);

// print out the LLVM IR for this module
console.log(libLLVM.LLVMPrintModuleToString(moduleRef));

// clean up
libLLVM.LLVMDisposeBuilder(builderRef);
libLLVM.LLVMDisposeModule(moduleRef);
```

And run it:

```bash
node main.js
```

And see the output of the LLVM IR created by the library:

```LLVM
; ModuleID = 'main_module'
source_filename = "main_module"

define void @main(i32 %argc, i8** %argsv) {
entry:
  ret void
}
```

**Now go build a compiler!**
