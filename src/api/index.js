import request from './request'
// import qs from 'qs'

// create cluster configuration file
export function createClusterConfig(cluster) {
    return request({
        url: 'clusters',
        data:  JSON.stringify(cluster),
        method: 'post'
    })
}




// get sessionID
export function sessionID(pod) {
    return request({
        url: 'pod/' + pod.namespace + '/' + pod.name + '/' + 'shell/' + pod.container,
        method: 'get',
    })
}

export function createCluster(cluster) {
    return request({
        url: 'cluster/' + cluster.metadata.namespace + '/' + cluster.metadata.name,
        data: JSON.stringify(cluster),
        method: 'post',
    })
}

export function deletCluster(cluster) {
    return request({
        url: 'cluster/' + cluster.metadata.namespace + '/' + cluster.metadata.name + '/delete',
        method: 'get',
    })
}

export function getNamespaces() {
    return request({
        url: 'namespaces',
        method: 'get',
    })
}

export function getKubeConfig(cluster) {
    return request({
        url: 'cluster/' + cluster.metadata.namespace + '/' + cluster.metadata.name + '/kubeconfig',
        method: 'get',
    })
}

export function getClusterService(cluster, params) {
    return request({
        url: 'cluster/' + cluster.metadata.namespace + '/' + cluster.metadata.name + '/services',
        method: 'get',
        params: params,
    })
}

export function getDolphinService() {
    return request({
        url: '/dolphinservices',
        method: 'get',
    })
}

export function forwardService(cluster, ds) {
    return request({
        url: 'cluster/' + cluster.metadata.namespace + '/' + cluster.metadata.name + '/dolphinservices',
        data: JSON.stringify(ds),
        method: 'post',
    })
}