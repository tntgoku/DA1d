import { SpecEntity } from "../entity/Object/SpecEntity";
import { apiClient } from "./getAPI";

export const SpecService ={
     async getAllspec() {
        const response = await apiClient.get("specification"); // endpoint thật
        if (response.data && response.data.status === 200) {
          console.log(response.data);
          return response.data.data.map(p => new SpecEntity(p));;
        } else {
          return [];
        }
        return [];
      },
         async getAllspecByProductId(product_id) {
        const response = await apiClient.get('specification/${product_id}'); // endpoint thật
        if (response.data && response.data.status === 200) {
          console.log(response.data);
          return response.data.data.map(p => new SpecEntity(p));;
        } else {
          return [];
        }
        return [];
      },
}