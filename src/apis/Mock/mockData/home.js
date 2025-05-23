import Mock from 'mockjs'

export const getHomeData = () => {
  return Mock.mock({
    'tableList|10': [
      {
        'brand|+1': [
          'oppo',
          'vivo',
          'huawei',
          'xiaomi',
          'apple',
          'samsung',
          'meizu',
          'oneplus',
          'realme',
          'lenovo',
        ],
        'day|100-800': 1,
        'month|1000-5000': 1,
        'all|10000-50000': 1,
      },
    ],
  })
}

export const getHomeCountData = () => {
  return [
    {
      name: '今日支付订单',
      value: 1234,
      icon: 'SuccessFilled',
      color: '#2ec7c9',
    },
    {
      name: '今日收藏订单',
      value: 210,
      icon: 'StarFilled',
      color: '#ffb980',
    },
    {
      name: '今日未支付订单',
      value: 1234,
      icon: 'GoodsFilled',
      color: '#5ab1ef',
    },
    {
      name: '本月支付订单',
      value: 1234,
      icon: 'SuccessFilled',
      color: '#2ec7c9',
    },
    {
      name: '本月收藏订单',
      value: 210,
      icon: 'StarFilled',
      color: '#ffb980',
    },
    {
      name: '本月未支付订单',
      value: 1234,
      icon: 'GoodsFilled',
      color: '#5ab1ef',
    },
  ]
}
