import { SpaRequest } from "@/types/request"
import { Employee } from "@/types/type"
import { createContext } from "react"
export type SpaRequestModel = SpaRequest & { promotionCode: string, active: number }
export type ContextProps = {
  req: SpaRequestModel,
  setReq: (r: SpaRequestModel) => void,
  emp: Employee[]
}

export const ServiceCheckoutContext = createContext<ContextProps>(null as unknown as ContextProps)