import Pizza from './Pizza';

export default interface Order {
    items: Pizza[];
    total: number;
}
