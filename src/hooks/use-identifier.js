import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "./use-auth";

export const useIndentifier = () => {
    const { isAuthenticated, user }  = useAuth();
    const [fpHash, setFpHash] = useState('');

    useEffect(() => {
        const setFp = async () => {
          const fp = await FingerprintJS.load();
    
          const { visitorId } = await fp.get();
    
          setFpHash(visitorId);
        };
    
        setFp();
      }, []);

    const vendorId = useMemo(() => {
        return isAuthenticated ? user.id : fpHash
    }, [fpHash, isAuthenticated])

    return vendorId
}