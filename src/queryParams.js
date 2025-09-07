export function updateQueryParams(updates = {}, navigate, currentParams){
    const newParams = new URLSearchParams(currentParams);
    Object.entries(updates).forEach(([key, value]) => {
        if(value === null || value === '' || value === undefined){
            newParams.delete(key)
        }else{
            newParams.set(key, value)
        }
    });
    navigate(`/products?${newParams.toString()}`)
}