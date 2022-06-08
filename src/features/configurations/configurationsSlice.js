import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   cluster: {
      hosts: [],
      roleGroups: {
         controlPlane: [],
         etcd: [],
         worker: [],
         registry: []
      },
      controlPlaneEndpoint: {},
      system:{},
      kubernetes: {},
      network: {},
      addons: {},
      etcd: {},
      registry: {},
   },
   step: 0
};


export const configurationsSlice = createSlice({
   name: 'configurations',
   initialState,
   reducers: {
      updateHosts: (state, action) => {
         state.cluster.hosts = action.payload.hosts
         state.cluster.roleGroups = action.payload.roleGroups
      },
      nextStep: (state) => {
         state.step += 1
         console.log(state.step)
      },
      lastStep: (state) => {
         state.step -= 1
      }
   },
})

export const {
   updateHosts,
    nextStep,
    lastStep
} = configurationsSlice.actions

export const selectConfiguration = (state) => state.configurations.cluster
export const selectStep = (state) => state.configurations.step;

export default configurationsSlice.reducer