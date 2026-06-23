import "../../styles/Header.css"


export default function Header() {
    return (
        <header className="header">
            <div>
                <h1>⚡ ElectricSearch</h1>
            </div>

            <button className="settings-btn">
                ⚙ Settings
            </button>
        </header>
    );
}