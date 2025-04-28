/**
 * Essa função recebe o número do `currentCycle` e retorna o número do próximo ciclo.
 *
 * Se o valor do `currentCycle` for `0` ou `8`, irá retornar `1`.
 * Se não for, isso quer dizer que o valor do `currentCycle` é igual ou maior que `1`, retornando o valor do `currentCycle` somando com mais `1`.
 * Quando o valor do `currentCycle` for igual a `8` irá retornar `1`, reiniciando o valor do ciclo.
 *
 * @example
 * const nextCycle = getNextCycle(0) // retorna 1
 * const nextCycle = getNextCycle(8) // retorna 1
 * const nextCycle = getNextCycle(1) // retorna 2
 * const nextCycle = getNextCycle(2) // retorna 3
 * @param currentCycle número do ciclo atual.
 * @returns o número do próximo ciclo.
 */
export function getNextCycle(currentCycle: number): number {
	return currentCycle === 0 || currentCycle === 8 ? 1 : currentCycle + 1
}
