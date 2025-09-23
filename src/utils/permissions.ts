import { Role, roleHierarchy, hasRole } from '../types/roles';

export function checkPermission(userRole: Role, requiredRole: Role): boolean {
  return hasRole(userRole, requiredRole);
}

export function getHighestRole(roles: Role[]): Role {
  let highest = 'VISITEUR' as Role;
  roles.forEach(role => {
    if (roleHierarchy.indexOf(role) < roleHierarchy.indexOf(highest)) {
      highest = role;
    }
  });
  return highest;
}