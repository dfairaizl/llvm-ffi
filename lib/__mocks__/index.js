/* global jest */

const refMock = {
  ref: jest.fn()
};

module.exports = {
  LLVMAddFunction: jest.fn().mockReturnValue(refMock),
  LLVMAddIncoming: jest.fn().mockReturnValue(refMock),
  LLVMAppendBasicBlock: jest.fn().mockReturnValue(refMock),
  LLVMBuildBr: jest.fn().mockReturnValue(refMock),
  LLVMBuildCall: jest.fn().mockReturnValue(refMock),
  LLVMBuildCondBr: jest.fn().mockReturnValue(refMock),
  LLVMBuildFAdd: jest.fn().mockReturnValue(refMock),
  LLVMBuildFCmp: jest.fn().mockReturnValue(refMock),
  LLVMBuildFMul: jest.fn().mockReturnValue(refMock),
  LLVMBuildFSub: jest.fn().mockReturnValue(refMock),
  LLVMBuildPhi: jest.fn().mockReturnValue(refMock),
  LLVMBuildRet: jest.fn().mockReturnValue(refMock),
  LLVMBuildUIToFP: jest.fn().mockReturnValue(refMock),
  LLVMConstReal: jest.fn().mockReturnValue(refMock),
  LLVMCountParams: jest.fn().mockReturnValue(refMock),
  LLVMDeleteFunction: jest.fn().mockReturnValue(refMock),
  LLVMFloatType: jest.fn().mockReturnValue(refMock),
  LLVMFunctionType: jest.fn().mockReturnValue(refMock),
  LLVMGetBasicBlockParent: jest.fn().mockReturnValue(refMock),
  LLVMGetInsertBlock: jest.fn().mockReturnValue(refMock),
  LLVMGetNamedFunction: jest.fn().mockReturnValue(refMock),
  LLVMGetParam: jest.fn().mockReturnValue(refMock),
  LLVMPositionBuilderAtEnd: jest.fn().mockReturnValue(refMock),
  LLVMSetLinkage: jest.fn().mockReturnValue(refMock),
  LLVMSetValueName: jest.fn().mockReturnValue(refMock),
  LLVMVerifyFunction: jest.fn().mockReturnValue(refMock)
};
