export interface DashboardData {
  data: ListOfDashBoards[]
  totalPages: number
  totalElements: number
  hasNext: boolean
}

export interface ListOfDashBoards {
  id: Id
  createdTime: number
  tenantId: TenantId
  name: string
  title: string
  assignedCustomers: AssignedCustomer[]
  mobileHide: boolean
  mobileOrder: number
  image: string
}

export interface Id {
  id: string
  entityType: string
}

export interface TenantId {
  id: string
  entityType: string
}

export interface AssignedCustomer {
  public: boolean
  customerId: CustomerId
  title: string
}

export interface CustomerId {
  id: string
  entityType: string
}
