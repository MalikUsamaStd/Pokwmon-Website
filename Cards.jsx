import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Card-scaling.css';
import './Pokemon-responsive.css';

function Cards({ pokemonData }) {
  const imageUrl =
    pokemonData?.sprites?.other?.dream_world?.front_default ||
    pokemonData?.sprites?.front_default ||
    'https://via.placeholder.com/150';

  const name = pokemonData?.name?.toUpperCase() || 'Unknown';
  const height = pokemonData?.height ?? '?';
  const weight = pokemonData?.weight ?? '?';
  const experience = pokemonData?.base_experience ?? '?';

  // Safely extract first ability
  const abilities = pokemonData?.abilities || [];
  const firstAbility = abilities.length > 0 ? abilities[0].ability.name : '?';

  // Safely extract types
  const types =
    pokemonData?.types?.map((typeInfo) => typeInfo.type.name).join(', ') || '?';

  return (
    <li className="pokemon-card">
      <Card style={{ width: '18rem' }} className="scale-card cards container">
        <Card.Img
          variant="top"
          src={imageUrl}
          alt={name}
          className="image-size"
        />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            <strong>Height:</strong> {height} | <strong>Weight:</strong> {weight}
            <br />
            <strong>Ability:</strong> {firstAbility}
            <br />
            <strong>Experience:</strong> {experience}
          </Card.Text>
          <Button
            style={{ backgroundColor: 'green', marginLeft: '60px' }}
            variant="success"
          >
            {types}
          </Button>
        </Card.Body>
      </Card>
    </li>
  );
}

export default Cards;
