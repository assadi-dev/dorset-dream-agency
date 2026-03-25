"use client"
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { fetchDecorators } from './services'

const useDecoratorApi = () => {


    const params = {
        limit: 10,
        order: 'desc'
    }
const {data,isLoading,isError} = useQuery({
    queryKey:['decorators',params],
    queryFn: async () =>fetchDecorators(params),
    initialData:{
        data:[],
        total:0
    },
    
})

  return {
   collection:data?.data,
   isLoading,
   isError,
   total:data?.total ?? 0,
   
  }
}

export default useDecoratorApi