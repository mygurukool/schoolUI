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

export const usePermissions = ({ scopes, exceptionLogin }) => {
  const loginType = useSelector((state) => state.user.loginType);
  const permissions = useSelector(
    (state) => state?.common?.currentGroup?.permissions
  );
  if (exceptionLogin) {
    if (exceptionLogin === loginType) {
      return true;
    }
  }

  // const permissions = role ? PERMISSIONS[role.toUpperCase()] : [];
  const permissionGranted = hasPermission({
    permissions: permissions || [],
    scopes,
  });
  return permissionGranted;
};

export default function PermissionsGate({
  children,
  scopes = [],
  errorProps = null,
  exceptionLogin,
}) {
  const permissionGranted = usePermissions({
    scopes: scopes,
    exceptionLogin,
  });

  if (permissionGranted) {
    return children || null;
  }

  if (!permissionGranted && errorProps)
    return cloneElement(children, { ...errorProps });
  if (!permissionGranted) return <></>;

  // return children;
}
