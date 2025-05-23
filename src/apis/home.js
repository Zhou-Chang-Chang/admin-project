import request from '@/utils/request'

export const getHomeData = () => request.get('/home/getTable')

export const getHomeCountData = () => request.get('/home/getCountData')

export const getHomeChartData = () => request.get('/home/getChartData')
