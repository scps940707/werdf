export class Supplier {
  id: string;
  creator: string;
  updater: string;
  remark: string;
  isDeleted: boolean;
  supplierName: string;
  unifiedBusinessNo: string;
  email: string;
  address1: string;
  address2: string;
  head: string;
  headPhone1: string;
  headPhone2: string;
  contactPerson: string;
  contactPersonPhone1: string;
  contactPersonPhone2: string;
  otherContact1: string;
  otherContact2: string;

  constructor() {
    this.id = '';
    this.creator = '';
    this.updater = '';
    this.remark = '';
    this.isDeleted = false;
    this.supplierName = '';
    this.unifiedBusinessNo = '';
    this.email = '';
    this.address1 = '';
    this.address2 = '';
    this.head = '';
    this.headPhone1 = '';
    this.headPhone2 = '';
    this.contactPerson = '';
    this.contactPersonPhone1 = '';
    this.contactPersonPhone2 = '';
    this.otherContact1 = '';
    this.otherContact2 = '';
  }
}

export class SearchCondition {
  pageSize: number;
  page: number;
  supplier: string;
  unifiedBusinessNo: string;
  address: string;
  email: string;
  name: string;
  phone: string;

  constructor() {
    this.pageSize = 10;
    this.page = 1;
    this.supplier = '';
    this.unifiedBusinessNo = '';
    this.address = '';
    this.email = '';
    this.name = '';
    this.phone = '';
  }
}
