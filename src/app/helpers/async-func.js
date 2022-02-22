import React, { Component } from "react";
import Loader from "../components/loader";
import moment from "moment";
import lodash from 'lodash'


export default function asyncComponent(importComponent) {
  class AsyncFunc extends Component {
    constructor(props) {
      super(props);
      this.state = {
        component: null
      };
    }
    componentWillMount() {
    }
    componentWillUnmount() {
      this.mounted = false;
    }
    async componentDidMount() {
      this.mounted = true;
      const { default: Component } = await importComponent();

      if (this.mounted) {
        this.setState({
          component: <Component {...this.props} />
        });
      }
    }

    render() {
      const Component = this.state.component || <Loader />;
      return Component;
    }
  }
  return AsyncFunc;
}



export async function groupByDates(payload) {
  try {
    let filter = await filterByDates(payload.data.salesListing)
    let salesListingMonths = lodash.chain(filter)
      .groupBy('startDate')
      .toPairs()
      .map(function (currentItem) { return lodash.zipObject(['date', 'data'], currentItem) }).value();
    let salesListingGraphs = await getCountOfSales(salesListingMonths)
    let salesListingTotalGraphs = await getCountOfSales(salesListingMonths, true)


    let filterTotalOrders = await filterOrdersByDates(payload.data.totalOrders)
    let totalOrderMonths = lodash.chain(filterTotalOrders)
      .groupBy('startDate')
      .toPairs()
      .map(function (currentItem) { return lodash.zipObject(['date', 'data'], currentItem) }).value();
    totalOrderMonths = totalOrderMonths.sort((a, b) => moment(b.date, "MMM YYYY").format('YYYYMMDD') - moment(a.date, "MMM YYYY").format('YYYYMMDD'))
    let totalOrderGraph = await getLengthOfMonth(totalOrderMonths)


    let filterCustomerData = await filterByDates(payload.data.customerData)
    let customerListingMonths = lodash.chain(filterCustomerData)
      .groupBy('startDate')
      .toPairs()
      .map(function (currentItem) { return lodash.zipObject(['date', 'data'], currentItem) }).value();
    customerListingMonths = customerListingMonths.sort((a, b) => moment(b.date, "MMM YYYY").format('YYYYMMDD') - moment(a.date, "MMM YYYY").format('YYYYMMDD'))
    let customerListingGraphs = await getLengthOfMonth(customerListingMonths)
    let totalCustomerListingGraphs = await getLengthOfMonth(customerListingMonths, true, payload.data.customerData)

    let filterTotalTransactionsData = await filterByDates(payload.data.totalTransactionsData)
    let totalTransactionsMonths = lodash.chain(filterTotalTransactionsData)
      .groupBy('startDate')
      .toPairs()
      .map(function (currentItem) { return lodash.zipObject(['date', 'data'], currentItem) }).value();
    totalTransactionsMonths = totalTransactionsMonths.sort((a, b) => moment(b.date, "MMM YYYY").format('YYYYMMDD') - moment(a.date, "MMM YYYY").format('YYYYMMDD'))
    let totalTransactionsMonthsGraphs = await getLengthOfMonth(totalTransactionsMonths)
    let totalTransactionsDaysGraphs = await getLengthOfMonth(totalTransactionsMonths, true, payload.data.totalTransactionsData)

    // console.log("totalTransactionsDaysGraphs ========", totalTransactionsDaysGraphs)
    let data = {
      geographicData: payload.data.geographicData,
      salesListing: payload.data.salesListing,
      totalOrders: payload.data.totalOrders,
      totalQtyListing: payload.data.totalQtyListing,
      inventoryListing: payload.data.inventoryListing,
      customerData: payload.data.customerData,
      salesListingMonths: salesListingMonths, salesListingTotalGraphs,
      salesListingGraphs: salesListingGraphs,
      totalOrderMonths, totalOrderGraph, totalCustomerListingGraphs,
      customerListingMonths, customerListingGraphs,
      totalVendorsListing: payload.data.totalVendorsListing,
      totalTransactionsData: payload.data.totalTransactionsData,
      totalTransactionsMonthsGraphs, totalTransactionsMonths,
      totalTransactionsDaysGraphs
    }
    return data;
  }
  catch (e) {
    console.log("Error ============>", e)
  }
}

export async function getLengthOfMonth(payload, mul, allDatas) {
  try {
    let monthNames = getMonths();
    let new_array = [];
    for (let i = 0; i < monthNames.length; i++) {
      let newData = payload.find(x => x.date === `${monthNames[i].month} ${monthNames[i].year}`)
      if (mul) {
        new_array.push(newData && newData.data && newData.data.length ? newData.data.length + (new_array.length > 0 ? new_array[new_array.length - 1] : 0) : new_array.length > 0 ? new_array[new_array.length - 1] : 0);
      } else {
        new_array.push(newData && newData.data && newData.data.length ? newData.data.length : 0);
      }
    }
    if (mul) {
      return await addOldDatas(new_array, allDatas)
    }
    return new_array;
  }
  catch (e) {
    console.log("Error ============>", e)
  }
}

export async function addOldDatas(payload, allDatas) {
  try {
    let totalVal = payload[payload.length - 1];
    let totalDataVal = allDatas.length
    let missingVal = totalDataVal - totalVal
    let new_array = [];
    for (let i = 0; i < payload.length; i++) {
        new_array.push(payload[i]+missingVal);
    }
    return new_array;
  }
  catch (e) {
    console.log("Error ============>", e)
  }
}

export async function getCountOfSales(payload, mul) {
  try {
    let monthNames = getMonths();
    let new_array = [];
    for (let i = 0; i < monthNames.length; i++) {
      let newData = payload.find(x => x.date === `${monthNames[i].month} ${monthNames[i].year}`)
      if (mul) {
        let data1 = newData && newData.data ? await priceCount(newData && newData.data) : 0
        new_array.push(data1 ? data1 + (new_array.length > 0 ? new_array[new_array.length - 1] : 0) : new_array.length > 0 ? new_array[new_array.length - 1] : 0);
      } else {
        let data = newData && newData.data ? await priceCount(newData && newData.data) : 0
        new_array.push(data ? data : 0);
      }
    }
    return new_array;
  }
  catch (e) {
    console.log("Error ============>", e)
  }
}

export async function priceCount(payload) {
  try {
    let data = 0
    console.log("payload ======", payload)
    for (let i = 0; i < payload.length; i++) {
      data = data + Math.ceil(payload[i].grand_total)
    }
    console.log("data ======", data)
    
    return data;
  }
  catch (e) {
    console.log("Error ============>", e)
  }
}

export function filterByDates(payload) {
  try {
    if (payload && payload.length) {
      let new_array = [];
      for (let i = 0; i < payload.length; i++) {
        let a = payload
        let event = a[i]
        if (moment().diff(moment(event.created_at), 'days') < 366) {
          let startDate = moment(event.created_at).format(`MMM YYYY`)
          event.dateVal = moment(event.created_at).format(`D`)
          event.startDate = startDate
          new_array.push(event);
        }
      }
      return new_array;
    }
  }
  catch (e) {
    console.log("Error ============>", e)
  }
}
export function filterOrdersByDates(payload) {
  try {
    if (payload && payload.length) {
      let new_array = [];
      for (let i = 0; i < payload.length; i++) {
        let a = payload
        let event = a[i]
        if (moment().diff(moment(event.order_created_at), 'days') < 366) {
          let startDate = moment(event.order_created_at).format(`MMM YYYY`)
          event.startDate = startDate
          new_array.push(event);
        }
      }
      return new_array;
    }
  }
  catch (e) {
    console.log("Error ============>", e)
  }
}


export function getMonths(payload) {
  let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let today = new Date();
  let d, month, year, lists = [];

  for (let i = 12; i >= 0; i -= 1) {
    d = new Date(today.getFullYear(), today.getMonth() - i, 1);
    year = moment(d).format("YYYY")
    month = monthNames[d.getMonth()];
    lists.push({ month, year })
  }
  return lists
}