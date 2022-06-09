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
      controlPlaneEndpoint: {
         domain: "lb.kubesphere.local",
         address: "",
         port: 6443,
      },
      system:{},
      kubernetes: {
         type: "kubernetes",
         version: "v1.21.5",
         containerManager: "docker",
         autoRenewCerts: true,
         kata: {
            enabled: false
         },
         nodeFeatureDiscovery: {
            enabled: false
         },
         nodelocaldns: true,

      },
      network: {
         plugin: "calico",
         kubePodsCIDR: "10.233.64.0/18",
         kubeServiceCIDR: "10.233.0.0/18"
      },
      addons: {},
      etcd: {},
      registry: {
         type: "default",
         privateRegistry: "",
         namespaceOverride: "",
         auths: {},
      },
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
      updateRegistry: (state, action) => {
         state.cluster.registry = action.payload.registry
      },
      updateControlPlane: (state, action) => {
         state.cluster.controlPlaneEndpoint = action.payload.controlPlaneEndpoint
      },
      updateCluster: (state, action) => {
         state.cluster.kubernetes = action.payload.kubernetes
      },
      updateNetwork: (state, action) => {
         state.cluster.network = action.payload.network
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
    updateRegistry,
    updateControlPlane,
    updateCluster,
    updateNetwork,
    nextStep,
    lastStep
} = configurationsSlice.actions

export const selectConfiguration = (state) => state.configurations.cluster
export const selectStep = (state) => state.configurations.step;

export default configurationsSlice.reducer