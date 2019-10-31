const libLLVM = require('../lib');
const enums = require('../lib/support/enums');

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
