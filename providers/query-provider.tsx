// 在 Next.js 中，這個文件會被命名為：app/providers.jsx
'use client';

// 由於 QueryClientProvider 在底層依賴於 useContext，我們必須在頂部添加 'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // 使用 SSR 時，我們通常希望將默認的 staleTime 設置為大於 0 的值
        // 以避免在客戶端立即重新獲取數據
        // staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === 'undefined') {
    // 服務器：總是創建一個新的 query client
    return makeQueryClient();
  } else {
    // 瀏覽器：如果我們還沒有 query client，則創建一個新的
    // 這非常重要，這樣我們就不會在初始渲染期間 React 暫停時重新創建一個新的客戶端
    // 如果我們在創建 query client 的下方有一個 suspense 邊界，這可能就不需要了
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

type Props = {
  children: React.ReactNode;
};

export function QueryProvider({ children }: Props) {
  // 注意：在初始化 query client 時避免使用 useState，
  // 如果你在可能暫停的代碼和這之間沒有 suspense 邊界
  // 因為如果在初始渲染時暫停且沒有邊界，React 會丟棄該客戶端
  const queryClient = getQueryClient();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
