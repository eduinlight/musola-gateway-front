const map = new Map<string, any>();

function getServiceName(declaration: any) {
  return declaration.name.toLowerCase();
}

export function addService(declaration: any) {
  const serviceName = getServiceName(declaration);
  if (!map.has(serviceName)) {
    map.set(serviceName, new declaration());
  }
}

export function addServiceInstance(serviceName: string, instance: any) {
  if (!map.has(serviceName)) {
    map.set(serviceName, instance);
  }
}

export function getService<T>(declaration: any) {
  const serviceName = getServiceName(declaration);
  if (!map.has(serviceName)) {
    throw new Error(`service name ${serviceName} does not exist`);
  }

  return map.get(serviceName) as T;
}
