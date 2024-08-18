import { createSlice } from "@reduxjs/toolkit";
import { IGeneral } from "@/interface/general";

const initialState: IGeneral = {
  userRoles: {},
  references: [],
  permissions: [],
  customerTypes: [],
  referenceTypes: {},
  permissionGroups: [],

  roles: [],
  uruus: [],
  tsags: [],
  tasags: [],
  ajiltans: [],
  uilchilgees: [],
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    init: (
      state,
      {
        payload,
      }: {
        payload: any;
      },
    ) => {
      const {
        userRoles,
        references,
        permissions,
        customerTypes,
        referenceTypes,
        permissionGroups,

        roles,
        uruus,
        tsags,
        tasags,
        ajiltans,
        uilchilgees,
      } = payload;

      return {
        ...state,
        userRoles,
        references,
        permissions,
        customerTypes,
        referenceTypes,
        permissionGroups,

        roles,
        uruus,
        tsags,
        tasags,
        ajiltans,
        uilchilgees,
      };
    },
  },
});

export const generalReducer = generalSlice.reducer;

export const { init } = generalSlice.actions;
