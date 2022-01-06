import { cloneElement } from "react";
import { useSelector } from "react-redux";
import { PERMISSIONS } from "../../constants";

const hasPermission = ({ permissions, scopes }) => {
  const scopesMap = {};
  scopes.forEach((scope) => {
    scopesMap[scope] = true;
  });

  return permissions.some((permission) => scopesMap[permission]);
};

export const usePermissions = ({ scopes }) => {
  const role = useSelector((state) => state.user.role);
  const permissions = role ? PERMISSIONS[role.toUpperCase()] : [];
  const permissionGranted = hasPermission({ permissions, scopes });
  return permissionGranted;
};

export default function PermissionsGate({
  children,
  scopes = [],
  errorProps = null,
}) {
  const permissionGranted = usePermissions({ scopes: scopes });

  if (permissionGranted) {
    return children || null;
  }

  if (!permissionGranted && errorProps)
    return cloneElement(children, { ...errorProps });
  if (!permissionGranted) return <></>;

  // return children;
}
