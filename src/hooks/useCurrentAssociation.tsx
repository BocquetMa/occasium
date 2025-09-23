import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import type { Association, Role } from "@prisma/client";
import type { Session } from "next-auth";

type MembershipLite = {
  userId: number;
  role: Role;
};

type AssociationWithMemberships = Association & {
  memberships: MembershipLite[];
};

export const useCurrentAssociation = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<Session["user"] | null>(null);
  const [currentAssociation, setCurrentAssociation] =
    useState<AssociationWithMemberships | null>(null);

  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
    }
  }, [session]);

  return { user, currentAssociation, setCurrentAssociation };
};
