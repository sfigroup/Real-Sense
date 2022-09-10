export interface DeviceData
{
  data:Device[];
  hasNext:boolean;
  totalElements:number;
  totalPages:number;
}

export interface Device {
  additionalInfo: string;
  createdTime: number;
  customerId: CustomerId;
  deviceData: DeviceData;
  deviceProfileId: DeviceProfileId;
  id: Id;
  label: string;
  name: string;
  tenantId: TenantId;
  type: string;
}

export interface CustomerId {
  id: string;
}

export interface DeviceData {
  configuration: Configuration;
  transportConfiguration: TransportConfiguration;
}

export interface Configuration {}

export interface TransportConfiguration {}

export interface DeviceProfileId {
  id: string;
}

export interface Id {
  id: string;
}

export interface TenantId {
  id: string;
}
