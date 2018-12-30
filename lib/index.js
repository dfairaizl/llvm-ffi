const ArrayType = require('ref-array');
const ffi = require('ffi');
const ref = require('ref');

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
} = require('./support/types');

// To list all the symbols in a dynamic Library:
// nm -gU /usr/local/Cellar/llvm/6.0.1/lib/libLLVM.dylib | grep JIT

const LLVM_LIB_PATH = process.env.LLVM_PATH || '/usr/local/lib/libLLVM.dylib';

const ValArray = ArrayType(LLVMValueRef);
const GenericValArray = ArrayType(LLVMGenericValueRef);

const libLLVM = ffi.Library(LLVM_LIB_PATH, {

  // Analysis
  'LLVMVerifyFunction': ['uint', [LLVMValueRef, 'uint']],

  // Context
  'LLVMContextCreate': [LLVMContextRef, []],
  'LLVMContextDispose': ['void', [LLVMContextRef]],

  // Basic Block
  'LLVMAppendBasicBlock': [LLVMBasicBlockRef, [LLVMValueRef, 'string']],
  'LLVMGetBasicBlockName': ['string', [LLVMBasicBlockRef]],
  'LLVMGetBasicBlockParent': [LLVMValueRef, [LLVMBasicBlockRef]],
  'LLVMGetEntryBasicBlock': [LLVMBasicBlockRef, [LLVMValueRef]],
  'LLVMGetFirstInstruction': [LLVMValueRef, [LLVMBasicBlockRef]],
  'LLVMGetLastInstruction': [LLVMValueRef, [LLVMBasicBlockRef]],

  // Core
  'LLVMSetLinkage': ['void', [LLVMValueRef, 'uint']],

  // Module
  'LLVMAddFunction': [LLVMValueRef, [LLVMModuleRef, 'string', LLVMTypeRef]],
  'LLVMDisposeModule': ['void', [LLVMModuleRef]],
  'LLVMGetModuleIdentifier': ['string', [LLVMModuleRef, sizetPtr]],
  'LLVMGetNamedFunction': [LLVMValueRef, [LLVMModuleRef, 'string']],
  'LLVMModuleCreateWithName': [LLVMModuleRef, ['string']],
  'LLVMPrintModuleToFile': ['string', [LLVMModuleRef, 'string', 'char**']],
  'LLVMPrintModuleToString': ['string', [LLVMModuleRef]],

  // Builder
  'LLVMBuildAlloca': [LLVMValueRef, [LLVMBuilderRef, LLVMTypeRef, 'string']],
  'LLVMBuildBr': [LLVMValueRef, [LLVMBuilderRef, LLVMBasicBlockRef]],
  'LLVMBuildCall': [LLVMValueRef, [LLVMBuilderRef, LLVMValueRef, ValArray, 'uint', 'string']],
  'LLVMBuildCondBr': [LLVMValueRef, [LLVMBuilderRef, LLVMValueRef, LLVMBasicBlockRef, LLVMBasicBlockRef]],
  'LLVMBuildFCmp': [LLVMValueRef, [LLVMBuilderRef, 'uint', LLVMValueRef, LLVMValueRef, 'string']],
  'LLVMBuildLoad': [LLVMValueRef, [LLVMBuilderRef, LLVMTypeRef, 'string']],
  'LLVMBuildPhi': [LLVMValueRef, [LLVMBuilderRef, LLVMTypeRef, 'string']],
  'LLVMBuildStore': [LLVMValueRef, [LLVMBuilderRef, LLVMValueRef, LLVMValueRef]],
  'LLVMBuildUIToFP': [LLVMValueRef, [LLVMBuilderRef, LLVMValueRef, LLVMTypeRef, 'string']],
  'LLVMCreateBuilderInContext': [LLVMBuilderRef, [LLVMContextRef]],
  'LLVMDeleteFunction': ['void', [LLVMValueRef]],
  'LLVMDisposeBuilder': ['void', [LLVMBuilderRef]],
  'LLVMGetInsertBlock': [LLVMBasicBlockRef, [LLVMBuilderRef]],
  'LLVMPositionBuilderAtEnd': ['void', [LLVMBuilderRef, LLVMBasicBlockRef]],
  'LLVMPositionBuilderBefore': ['void', [LLVMBuilderRef, LLVMValueRef]],

  // Phi Nodes
  'LLVMAddIncoming': ['void', [LLVMValueRef, ref.refType(LLVMValueRef), ref.refType(LLVMBasicBlockRef), 'uint']],

  // Build Instructions
  'LLVMBuildFAdd': [LLVMValueRef, [LLVMBuilderRef, LLVMValueRef, LLVMValueRef, 'string']],
  'LLVMBuildFMul': [LLVMValueRef, [LLVMBuilderRef, LLVMValueRef, LLVMValueRef, 'string']],
  'LLVMBuildFSub': [LLVMValueRef, [LLVMBuilderRef, LLVMValueRef, LLVMValueRef, 'string']],
  'LLVMBuildRet': ['void', [LLVMBuilderRef, LLVMValueRef]],

  // Types
  'LLVMDoubleType': [LLVMTypeRef, []],
  'LLVMFloatType': [LLVMTypeRef, []],
  'LLVMFunctionType': [LLVMTypeRef, [LLVMTypeRef, ValArray, 'uint', 'int']],

  // Functions
  'LLVMGetParam': [LLVMValueRef, [LLVMValueRef, 'uint']],
  'LLVMGetParams': ['void', [LLVMValueRef, ValArray]],

  // Values
  'LLVMConstReal': [LLVMValueRef, [LLVMTypeRef, 'double']],
  'LLVMCountParams': ['uint', [LLVMValueRef]],
  'LLVMGetValueName': ['string', [LLVMValueRef]],
  'LLVMSetValueName': ['void', [LLVMValueRef, 'string']],
  'LLVMDumpValue': ['void', [LLVMValueRef]],

  // Execution Engine
  'LLVMCreateExecutionEngineForModule': ['uint', [LLVMExecutionEngineRef, LLVMModuleRef, 'char **']],
  'LLVMGenericValueToFloat': ['float', [LLVMTypeRef, LLVMGenericValueRef]],
  'LLVMLinkInMCJIT': ['void', []],
  'LLVMRunFunction': [LLVMGenericValueRef, [LLVMExecutionEngineRef, LLVMValueRef, 'uint', GenericValArray]],

  // Targets
  'LLVMCreateTargetMachine': [LLVMTargetMachineRef, [LLVMTargetRef, 'string', 'string', 'string', 'uint', 'uint', 'uint']],
  'LLVMGetDefaultTargetTriple': ['string', []],
  'LLVMGetTargetFromTriple': ['uint', ['string', LLVMTargetRef, 'char **']],
  'LLVMInitializeX86AsmParser': ['void', []],
  'LLVMInitializeX86AsmPrinter': ['void', []],
  'LLVMInitializeX86Target': ['void', []],
  'LLVMInitializeX86TargetInfo': ['void', []],
  'LLVMInitializeX86TargetMC': ['void', []],
  'LLVMTargetMachineEmitToFile': ['uint', [LLVMTargetMachineRef, LLVMModuleRef, 'string', 'uint', 'char **']]
});

module.exports = libLLVM;
