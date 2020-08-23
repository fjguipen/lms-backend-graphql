import { QueryBuilder, Model, OrderByDirection } from "objection";

export function sortByOrderPosition(
  builder: QueryBuilder<Model>,
  direction: OrderByDirection = "ASC"
) {
  builder.orderBy("order_position", direction);
}
