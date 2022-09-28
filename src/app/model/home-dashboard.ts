export interface HomeDashBoard {
  assignedCustomers: AssignedCustomer[]
  configuration: string
  createdTime: number
  hideDashboardToolbar: boolean
  id: Id
  name: string
  tenantId: TenantId
  title: string
}

export interface AssignedCustomer {
  customerId: CustomerId
  public: boolean
  title: string
  isPublic: boolean
}

export interface CustomerId {
  id: string
}

export interface Id {
  id: string
}

export interface TenantId {
  id: string
}
