import { useEffect } from "react";

type Props = {
  position: string[],
  setPosition: React.Dispatch<React.SetStateAction<string[]>>,
}

export const Geo: React.FC<Props> = (props) => {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      props.setPosition([lon.toString(), lat.toString()]);
    })
  }, []);

  // const googleMapUrl = `http://maps.google.co.jp/maps?q=${props.position[1]},${props.position[0]}&output=embed&t=m&z=7&hl=ja`;
  return (
    <>
      {/* <iframe src={googleMapUrl} title="map" scrolling="no" width="auto" height="200px"></iframe> */}
    </>
  )
};