type AssetSize = 200 | 300 | 400 | 500;

export function assetUrl(path: string, size: AssetSize = 500) {
  return `${process.env.NEXT_PUBLIC_ASSETS_URL}/t/p/w${size}/${path}`;
}
