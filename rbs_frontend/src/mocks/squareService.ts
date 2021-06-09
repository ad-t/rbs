export async function startSquareProcess() {
  return new Promise<string>((resolve) => {
    setTimeout(
      () =>
        resolve(
          'https://www.google.com'
          // You should return https://connect.squareup.com/v2/checkout?c={{CHECKOUT_ID}}&l={{LOCATION_ID}}
        ),
      1000
    );
  });
}
