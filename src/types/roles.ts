export type Role =
  | 'SUPER_ADMIN'
  | 'PRESIDENT'
  | 'VICE_PRESIDENT'
  | 'TRESORIER'
  | 'SECRETAIRE'
  | 'ADMIN'
  | 'MODERATEUR'
  | 'MEMBRE_ACTIF'
  | 'MEMBRE'
  | 'VISITEUR';

export const roleHierarchy: Role[] = [
  'SUPER_ADMIN',
  'PRESIDENT',
  'VICE_PRESIDENT',
  'TRESORIER',
  'SECRETAIRE',
  'ADMIN',
  'MODERATEUR',
  'MEMBRE_ACTIF',
  'MEMBRE',
  'VISITEUR',
];

export function hasRole(userRole: Role, requiredRole: Role): boolean {
  return roleHierarchy.indexOf(userRole) <= roleHierarchy.indexOf(requiredRole);
}