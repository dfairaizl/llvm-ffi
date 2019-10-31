const Enum = require('enum');

const LLVMCodeGenFileType = new Enum({
  'LLVMAssemblyFile': 0,
  'LLVMObjectFile': 1
});

const LLVMCodeGenOptLevel = new Enum({
  'LLVMCodeGenLevelNone': 0,
  'LLVMCodeGenLevelLess': 1,
  'LLVMCodeGenLevelDefault': 2,
  'LLVMCodeGenLevelAggressive': 3
});

const LLVMCodeModel = new Enum({
  'LLVMCodeModelDefault': 0,
  'LLVMCodeModelJITDefault': 1,
  'LLVMCodeModelTiny': 2,
  'LLVMCodeModelSmall': 3,
  'LLVMCodeModelKernel': 4,
  'LLVMCodeModelMedium': 5,
  'LLVMCodeModelLarge': 6
});

const LLVMLinkage = new Enum({
  'LLVMExternalLinkage': 0
});

const LLVMIntPredicate = new Enum({
  'LLVMIntEQ': 32,
  'LLVMIntNE': 33,
  'LLVMIntUGT': 34,
  'LLVMIntUGE': 35,
  'LLVMIntULT': 36,
  'LLVMIntULE': 37,
  'LLVMIntSGT': 38,
  'LLVMIntSGE': 39,
  'LLVMIntSLT': 40,
  'LLVMIntSLE': 41
});

const LLVMRealPredicate = new Enum({
  'LLVMRealPredicateFalse': 0,
  'LLVMRealOEQ': 1,
  'LLVMRealOGT': 2,
  'LLVMRealOGE': 3,
  'LLVMRealOLT': 4,
  'LLVMRealOLE': 5,
  'LLVMRealONE': 6,
  'LLVMRealORD': 7,
  'LLVMRealUNO': 8,
  'LLVMRealUEQ': 9,
  'LLVMRealUGT': 10,
  'LLVMRealUGE': 11,
  'LLVMRealULT': 12,
  'LLVMRealULE': 13,
  'LLVMRealUNE': 14,
  'LLVMRealPredicateTrue': 15
});

const LLVMRelocMode = new Enum({
  'LLVMRelocDefault': 0,
  'LLVMRelocStatic': 1,
  'LLVMRelocPIC': 2,
  'LLVMRelocDynamicNoPic': 3
});

const LLVMVerifierFailureAction = new Enum({
  'LLVMAbortProcessAction': 0,
  'LLVMPrintMessageAction': 1,
  'LLVMReturnStatusAction': 2
});

module.exports = {
  LLVMCodeGenFileType,
  LLVMCodeGenOptLevel,
  LLVMCodeModel,
  LLVMIntPredicate,
  LLVMLinkage,
  LLVMRealPredicate,
  LLVMRelocMode,
  LLVMVerifierFailureAction
};
