
import AddButton from './components/AddButton'
import FilterButton from './components/FilterButton'
import SearchBar from './components/SearchBar'
import Reminders from './components/Reminders'

function App() {
  return (
    <div className="container mx-auto center px-4 py-6">
      <h1 className="flex justify-center py-2 font-sans font-bold text-4xl md:text-6xl"><span className="text-sky-500">Bezt</span>Reminder</h1>
      <div className='flex justify-center mt-5'>
        <FilterButton />
        <AddButton />
        <SearchBar />
      </div>
      <div className='flex justify-center mt-10'>
        <Reminders />
      </div>
      
    </div>
  );
}

export default App;
