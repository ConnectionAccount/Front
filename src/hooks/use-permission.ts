import { useSelector } from "react-redux";
import { IAuth } from "@/interface/auth";

export const usePermission = () => {
  const { permissions } = useSelector((state: { auth: IAuth }) => state.auth);

  return {
    checkPermission: (
      code: string,
      isRead?: boolean,
      isWrite?: boolean,
      isRemove?: boolean,
    ) => {
      const perm = permissions?.find((perm) => perm.code === code);

      if (isRead === true && perm?.isRead === true) {
        return false;
      }

      if (isWrite === true && perm?.isWrite === true) {
        return false;
      }

      if (isRemove === true && perm?.isRemove === true) {
        return false;
      }

      return true;
    },
  };
};
