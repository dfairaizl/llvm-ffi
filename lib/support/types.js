const ref = require('ref');

module.exports = {
  // LLVM Pointers
  LLVMBasicBlockRef: ref.refType(ref.types.void),
  LLVMBuilderRef: ref.refType(ref.types.void),
  LLVMContextRef: ref.refType(ref.types.void),
  LLVMExecutionEngineRef: ref.refType(ref.types.void),
  LLVMGenericValueRef: ref.refType(ref.types.void),
  LLVMLinkage: ref.refType(ref.types.void),
  LLVMModuleRef: ref.refType(ref.types.void),
  LLVMTargetMachineRef: ref.refType(ref.types.void),
  LLVMTargetRef: ref.refType(ref.types.void),
  LLVMTypeRef: ref.refType(ref.types.void),
  LLVMValueRef: ref.refType(ref.types.void),

  // C Types
  sizetPtr: ref.refType(ref.types.size_t)
};

module.exports.alloc = function (type) {
  return ref.alloc(type);
};
