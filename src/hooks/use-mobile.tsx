import * as React from "react";

const MOBILE_BREAKPOINT = 768;
const MD_MOBILE_BREAKPOINT = 992;
const SM_MOBILE_BREAKPOINT = 576;

export function useIsMobile() {
  const [isMdMobile, setIsMdMobile] = React.useState<boolean | undefined>(
    undefined,
  );
  const [isSmMobile, setIsSmMobile] = React.useState<boolean | undefined>(
    undefined,
  );
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const mdMql = window.matchMedia(
      `(max-width: ${MD_MOBILE_BREAKPOINT - 1}px)`,
    );
    const smMql = window.matchMedia(
      `(max-width: ${SM_MOBILE_BREAKPOINT - 1}px)`,
    );
    const mobileMql = window.matchMedia(
      `(max-width: ${MOBILE_BREAKPOINT - 1}px)`,
    );

    const onMdChange = () => {
      setIsMdMobile(window.innerWidth < MD_MOBILE_BREAKPOINT);
    };
    const onSmChange = () => {
      setIsSmMobile(window.innerWidth < SM_MOBILE_BREAKPOINT);
    };
    const onMobileChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    mdMql.addEventListener("change", onMdChange);
    smMql.addEventListener("change", onSmChange);
    mobileMql.addEventListener("change", onMobileChange);

    setIsMdMobile(window.innerWidth < MD_MOBILE_BREAKPOINT);
    setIsSmMobile(window.innerWidth < SM_MOBILE_BREAKPOINT);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    return () => {
      mdMql.removeEventListener("change", onMdChange);
      smMql.removeEventListener("change", onSmChange);
      mobileMql.removeEventListener("change", onMobileChange);
    };
  }, []);

  return {
    isMdMobile: !!isMdMobile,
    isSmMobile: !!isSmMobile,
    isMobile: !!isMobile,
  };
}
