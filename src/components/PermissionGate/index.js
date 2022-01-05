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

export default function PermissionsGate({
  children,
  scopes = [],
  errorProps = null,
}) {
  const role = useSelector((state) => state.user.role);

  console.log("role", role);
  const permissions = role ? PERMISSIONS[role.toUpperCase()] : [];

  const permissionGranted = hasPermission({ permissions, scopes });
  if (!permissionGranted && errorProps)
    return cloneElement(children, { ...errorProps });
  if (!permissionGranted) return <></>;

  return children;
}
