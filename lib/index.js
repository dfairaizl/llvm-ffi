const ArrayType = require("ref-array");
const ffi = require("ffi");
const ref = require("ref");

const {
  LLVMBasicBlockRef,
  LLVMBuilderRef,
  LLVMContextRef,
  LLVMExecutionEngineRef,
  LLVMGenericValueRef,
  LLVMModuleRef,
  LLVMTargetMachineRef,
  LLVMTargetRef,
  LLVMTypeRef,
  LLVMValueRef,
  sizetPtr
} = require("./support/types");

// To list all the symbols in a dynamic Library:
// nm -gU /usr/local/Cellar/llvm/6.0.1/lib/libLLVM.dylib | grep JIT

const LLVM_LIB_PATH =
  process.env.LLVM_PATH || "/usr/local/Cellar/llvm@8/8.0.1_3/lib/libLLVM";

const ValArray = ArrayType(LLVMValueRef);
const TypeArray = ArrayType(LLVMTypeRef);
const GenericValArray = ArrayType(LLVMGenericValueRef);

const libLLVM = ffi.Library(LLVM_LIB_PATH, {
  // Analysis
  LLVMVerifyFunction: ["uint", [LLVMValueRef, "uint"]],

  // Context
  LLVMContextCreate: [LLVMContextRef, []],
  LLVMContextDispose: ["void", [LLVMContextRef]],
  LLVMGetGlobalContext: [LLVMContextRef, []],

  // Basic Block
  LLVMAppendBasicBlock: [LLVMBasicBlockRef, [LLVMValueRef, "string"]],
  LLVMGetBasicBlockName: ["string", [LLVMBasicBlockRef]],
  LLVMGetBasicBlockParent: [LLVMValueRef, [LLVMBasicBlockRef]],
  LLVMGetEntryBasicBlock: [LLVMBasicBlockRef, [LLVMValueRef]],
  LLVMGetFirstInstruction: [LLVMValueRef, [LLVMBasicBlockRef]],
  LLVMGetLastInstruction: [LLVMValueRef, [LLVMBasicBlockRef]],
  LLVMMoveBasicBlockBefore: ["void", [LLVMBasicBlockRef, LLVMBasicBlockRef]],

  // Core
  LLVMSetLinkage: ["void", [LLVMValueRef, "uint"]],

  // Module
  LLVMAddFunction: [LLVMValueRef, [LLVMModuleRef, "string", LLVMTypeRef]],
  LLVMDisposeModule: ["void", [LLVMModuleRef]],
  LLVMGetModuleIdentifier: ["string", [LLVMModuleRef, sizetPtr]],
  LLVMGetNamedFunction: [LLVMValueRef, [LLVMModuleRef, "string"]],
  LLVMModuleCreateWithName: [LLVMModuleRef, ["string"]],
  LLVMPrintModuleToFile: ["string", [LLVMModuleRef, "string", "char**"]],
  LLVMPrintModuleToString: ["string", [LLVMModuleRef]],

  // Builder
  LLVMBuildAdd: [
    LLVMValueRef,
    [LLVMBuilderRef, LLVMValueRef, LLVMValueRef, "string"]
  ],
  LLVMBuildAlloca: [LLVMValueRef, [LLVMBuilderRef, LLVMTypeRef, "string"]],
  LLVMBuildArrayAlloca: [LLVMValueRef, [LLVMBuilderRef, LLVMTypeRef, LLVMValueRef, "string"]],
  LLVMBuildBitCast: [LLVMValueRef, [LLVMBuilderRef, LLVMValueRef, LLVMTypeRef, "string"]],
  LLVMBuildBr: [LLVMValueRef, [LLVMBuilderRef, LLVMBasicBlockRef]],
  LLVMBuildCall: [
    LLVMValueRef,
    [LLVMBuilderRef, LLVMValueRef, ValArray, "uint", "string"]
  ],
  LLVMBuildCondBr: [
    LLVMValueRef,
    [LLVMBuilderRef, LLVMValueRef, LLVMBasicBlockRef, LLVMBasicBlockRef]
  ],
  LLVMBuildExactSDiv: [
    LLVMValueRef,
    [LLVMBuilderRef, LLVMValueRef, LLVMValueRef, "string"]
  ],
  LLVMBuildSRem: [
    LLVMValueRef,
    [LLVMBuilderRef, LLVMValueRef, LLVMValueRef, "string"]
  ],
  LLVMBuildFAdd: [
    LLVMValueRef,
    [LLVMBuilderRef, LLVMValueRef, LLVMValueRef, "string"]
  ],
  LLVMBuildInBoundsGEP: [
    LLVMValueRef,
    [LLVMBuilderRef, LLVMValueRef, ValArray, "uint", "string"]
  ],
  LLVMBuildStructGEP: [
    LLVMValueRef,
    [LLVMBuilderRef, LLVMValueRef, "uint", "string"]
  ],
  LLVMBuildFCmp: [
    LLVMValueRef,
    [LLVMBuilderRef, "uint", LLVMValueRef, LLVMValueRef, "string"]
  ],
  LLVMBuildFMul: [
    LLVMValueRef,
    [LLVMBuilderRef, LLVMValueRef, LLVMValueRef, "string"]
  ],
  LLVMBuildFSub: [
    LLVMValueRef,
    [LLVMBuilderRef, LLVMValueRef, LLVMValueRef, "string"]
  ],
  LLVMBuildGlobalStringPtr: [
    LLVMValueRef,
    [LLVMBuilderRef, "string", "string"]
  ],
  LLVMBuildICmp: [
    LLVMValueRef,
    [LLVMBuilderRef, "uint", LLVMValueRef, LLVMValueRef, "string"]
  ],
  LLVMBuildLoad: [LLVMValueRef, [LLVMBuilderRef, LLVMTypeRef, "string"]],
  LLVMBuildMul: [
    LLVMValueRef,
    [LLVMBuilderRef, LLVMValueRef, LLVMValueRef, "string"]
  ],
  LLVMBuildPhi: [LLVMValueRef, [LLVMBuilderRef, LLVMTypeRef, "string"]],
  LLVMBuildRet: ["void", [LLVMBuilderRef, LLVMValueRef]],
  LLVMBuildRetVoid: ["void", [LLVMBuilderRef]],
  LLVMBuildStore: [LLVMValueRef, [LLVMBuilderRef, LLVMValueRef, LLVMValueRef]],
  LLVMBuildSub: [
    LLVMValueRef,
    [LLVMBuilderRef, LLVMValueRef, LLVMValueRef, "string"]
  ],
  LLVMBuildUIToFP: [
    LLVMValueRef,
    [LLVMBuilderRef, LLVMValueRef, LLVMTypeRef, "string"]
  ],
  LLVMCreateBuilder: [LLVMBuilderRef, []],
  LLVMCreateBuilderInContext: [LLVMBuilderRef, [LLVMContextRef]],
  LLVMDeleteFunction: ["void", [LLVMValueRef]],
  LLVMDisposeBuilder: ["void", [LLVMBuilderRef]],
  LLVMGetInsertBlock: [LLVMBasicBlockRef, [LLVMBuilderRef]],
  LLVMPositionBuilderAtEnd: ["void", [LLVMBuilderRef, LLVMBasicBlockRef]],
  LLVMPositionBuilderBefore: ["void", [LLVMBuilderRef, LLVMValueRef]],

  // Phi Nodes
  LLVMAddIncoming: [
    "void",
    [
      LLVMValueRef,
      ref.refType(LLVMValueRef),
      ref.refType(LLVMBasicBlockRef),
      "uint"
    ]
  ],

  // Types
  LLVMArrayType: [LLVMTypeRef, [LLVMTypeRef, "uint"]],
  LLVMDoubleType: [LLVMTypeRef, []],
  LLVMFloatType: [LLVMTypeRef, []],
  LLVMFunctionType: [LLVMTypeRef, [LLVMTypeRef, ValArray, "uint", "int"]],
  LLVMInt1Type: [LLVMTypeRef, []],
  LLVMInt32Type: [LLVMTypeRef, []],
  LLVMInt8Type: [LLVMTypeRef, []],
  LLVMPointerType: [LLVMTypeRef, [LLVMTypeRef, "uint"]],
  LLVMVoidType: [LLVMTypeRef, []],
  LLVMStructCreateNamed: [LLVMTypeRef, [LLVMContextRef, "string"]],

  // Struct Type
  LLVMStructSetBody: ["void", [LLVMTypeRef, TypeArray, "uint", "uint"]],

  // Functions
  LLVMGetParam: [LLVMValueRef, [LLVMValueRef, "uint"]],
  LLVMGetParams: ["void", [LLVMValueRef, ValArray]],

  // Values
  LLVMConstInt: [LLVMValueRef, [LLVMTypeRef, "uint64"]],
  LLVMConstReal: [LLVMValueRef, [LLVMTypeRef, "double"]],
  LLVMConstString: [LLVMValueRef, ["string", "uint", "uint"]],
  LLVMCountParams: ["uint", [LLVMValueRef]],
  LLVMDumpValue: ["void", [LLVMValueRef]],
  LLVMGetValueName: ["string", [LLVMValueRef]],
  LLVMSetValueName: ["void", [LLVMValueRef, "string"]],

  // Execution Engine
  LLVMCreateExecutionEngineForModule: [
    "uint",
    [LLVMExecutionEngineRef, LLVMModuleRef, "char **"]
  ],
  LLVMAddModule: ["void", [LLVMExecutionEngineRef, LLVMModuleRef]],
  LLVMGenericValueToFloat: ["float", [LLVMTypeRef, LLVMGenericValueRef]],
  LLVMLinkInMCJIT: ["void", []],
  LLVMRunFunction: [
    LLVMGenericValueRef,
    [LLVMExecutionEngineRef, LLVMValueRef, "uint", GenericValArray]
  ],

  // Targets
  LLVMCreateTargetMachine: [
    LLVMTargetMachineRef,
    [LLVMTargetRef, "string", "string", "string", "uint", "uint", "uint"]
  ],
  LLVMGetDefaultTargetTriple: ["string", []],
  LLVMGetTargetFromTriple: ["uint", ["string", LLVMTargetRef, "char **"]],
  LLVMInitializeX86AsmParser: ["void", []],
  LLVMInitializeX86AsmPrinter: ["void", []],
  LLVMInitializeX86Target: ["void", []],
  LLVMInitializeX86TargetInfo: ["void", []],
  LLVMInitializeX86TargetMC: ["void", []],
  LLVMTargetMachineEmitToFile: [
    "uint",
    [LLVMTargetMachineRef, LLVMModuleRef, "string", "uint", "char **"]
  ]
});

module.exports = libLLVM;
