"use client"
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { fetchDecorators } from './services'

const useDecoratorApi = () => {


    const params = {
        limit: 10,
        order: 'desc'
    }
const {data,isLoading,error} = useQuery({
    queryKey:['decorators',params],
    queryFn: async () =>fetchDecorators(params),
    initialData:{
        data:[],
        totalItems:0,
        page:1,
        limit:10
    },
    
})

  return {
   collections:data?.data,
   isLoading,
   error,
   total:data?.totalItems ?? 0,
   
  }
}

export default useDecoratorApi