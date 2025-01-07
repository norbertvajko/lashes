import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

const usePreviousRoute = (): string | undefined => {
  const router = useRouter();
  const previousPathRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      previousPathRef.current = router.asPath;
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  return previousPathRef.current;
};

export default usePreviousRoute;
