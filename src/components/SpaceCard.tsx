import React from 'react';

interface SpaceData {
  spaceName: string;
}

interface SpaceCardProps {
  spaceData: SpaceData;
}

const SpaceCard: React.FC<SpaceCardProps> = ({ spaceData }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 hover:shadow-lg transition-shadow duration-200">
      <h3 className="text-lg font-semibold">{spaceData.spaceName}</h3>
      <p className="text-sm text-gray-500 mt-2">Click to view details</p>
    </div>
  );
};

export default SpaceCard;