import { useCurrentAssociation } from './useCurrentAssociation';
import { Role as RoleEnum } from '@prisma/client';
import type { Role } from '@prisma/client';

type MembershipType = {
  userId: number;
  role: Role;
};

export const usePermissions = () => {
  const { user, currentAssociation } = useCurrentAssociation();

  const canManageAssociation = (slug?: string) => {
    if (!user || !currentAssociation) return false;

    const membershipRole: Role | null =
      currentAssociation.memberships?.find(
        (m: MembershipType) => m.userId === user.id
      )?.role || null;

    return (
      membershipRole === RoleEnum.PRESIDENT ||
      user.globalRole === RoleEnum.SUPER_ADMIN
    );
  };

  return { canManageAssociation };
};
