export class Colors {
  // Define color properties as static constants
  static readonly gray95: string = '#ffffff'; // Example: Blue
  static readonly secondary: string = '#00b377'; // Example: Green
}
export const darkTheme = {
  dark: true,
  colors: {
    primary: Colors.secondary,
    background: '#121212',
    card: '#1f1f1f',
    text: '#ffffff',
    border: '#333333',
    notification: Colors.secondary,
  },
};
